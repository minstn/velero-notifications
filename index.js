require('dotenv').config();
const puppeteer = require('puppeteer');
const sgMail = require('@sendgrid/mail');
const cache =  require('memcached-node');

sgMail.setApiKey(process.env.SENDGRID_KEY);

const getData = async (cache, forKey) => {
    try {
        cache.get(forKey, function (err, value, key) {
		    if (value != null) {
        		console.log(value.toString());
        		return value.toString();
    		}
		});
    } catch (err) {
        console.log('error: ', err);
    }
}

(async () => {
	const targetUrl = process.env.LIQUIDATION_URL;
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setUserAgent(process.env.USER_AGENT);
	await page.goto(targetUrl, {
		waitUntil: 'networkidle0',
	});

	const nodeList = await page.$$('main');
	const dataSection = nodeList[0];

	if(typeof dataSection === 'undefined'){
		console.log("No main section found");
		return false;
	}

	const sections = await dataSection.$$('section');
	// console.log(sections.length);
	const mainSection = sections[1];

	const currentVeleroAsArray = await mainSection.$$eval(process.env.TARGET_CSS_CLASS, (nodes) => nodes.map((n) => n.innerText) );

	// await page.pdf({ path: 'hn.pdf', format: 'a4' });
	await browser.close();

	if( typeof currentVeleroAsArray === 'undefined'){
		console.log('No velero texts found on Velero ' + targetUrl); return;
	}

	if(currentVeleroAsArray.length === 0){
		console.log('Empty velero texts!'); return;
	} else {
		// console.log('Velero array length: ' + currentVeleroAsArray.length);
	}

	const currentVeleroAsString = JSON.stringify(currentVeleroAsArray);
	const connection = cache.createConnection('localhost:11211'); //we assume the default port

	await connection.connect();
	if(connection.isReady){
		const value = await connection.get('veleroAuctions');
		if(typeof value.data.veleroAuctions !== 'undefined'){
			//compare values as strings, if we have them different
			if(value.data.veleroAuctions.value !== currentVeleroAsString){
				//send an Email and store value
				console.log('Sending email, storing val ...');

				let msg = {
					to: process.env.RECEIVERS, // Change to your recipient
					from: process.env.SENDER_EMAIL_ADDRESS, // Change to your verified sender
					subject: `👛 ${currentVeleroAsArray[0]} New Velero DOA Auctions 🤑 available for ${currentVeleroAsArray[3]}`,
					text: `Get ready now! `,
					html: `<strong>Get ready now! ${currentVeleroAsArray[0]}, ${currentVeleroAsArray[1]}, ${currentVeleroAsArray[2]}, ${currentVeleroAsArray[3]}, Max ${currentVeleroAsArray[4]}</strong>`,
				};
				if(currentVeleroAsArray[0] === '0'){
					msg = {
						to: process.env.RECEIVERS, // Change to your recipient
						from: process.env.SENDER_EMAIL_ADDRESS, // Change to your verified sender
						subject: `🤷 All bets are off on Velero DOA 🐶`,
						text: `All bets are off`,
						html: `<strong>All bets are off</strong>`
					};
				}

				await sgMail.send(msg);

				await connection.set('veleroAuctions', currentVeleroAsString, {isCompressed: false, expires: 10*60});
			} else {
				//update expiration to
				console.log('Touching ...');
				await connection.touch('veleroAuctions', 10*60 /*10 minutes*/);
			}
		} else {
			if(currentVeleroAsArray[0] !== '0'){
				let msg = {
					to: process.env.RECEIVERS, // Change to your recipient
					from: process.env.SENDER_EMAIL_ADDRESS, // Change to your verified sender
					subject: `👛 ${currentVeleroAsArray[0]} New Velero DOA Auctions 🤑 available for ${currentVeleroAsArray[3]}`,
					text: `Get ready now! `,
					html: `<strong>Get ready now! ${currentVeleroAsArray[0]}, ${currentVeleroAsArray[1]}, ${currentVeleroAsArray[2]}, ${currentVeleroAsArray[3]}, Max ${currentVeleroAsArray[4]}</strong>`,
				};
				await sgMail.send(msg);
			}
			//we assume the value is not set in memcached, so we try to set it
			//store only if valid array
			if(currentVeleroAsArray.length === 5){
				console.log('Storing val ...');
				await connection.set('veleroAuctions', currentVeleroAsString, {isCompressed: false, expires: 10*60});
			} else {
				console.log('Invalid currentVeleroAsArray -> ' + currentVeleroAsString);
			}
		}
	}

	connection.close();
})();