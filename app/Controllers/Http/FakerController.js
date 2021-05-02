'use strict'

const faker = require('faker');
faker.locale = "es_MX";
const { Parser } = require('json2csv');

class FakerController {
    

    buildModel ({ request, response }) {
        const { rows, fields } = request.post();
        const results = []
        for (let i = 0; i < rows; i++) {
            const currentRow = {}
            for (let property in fields) {
                console.log(fields[property][0], fields[property][1])
                currentRow[property] = faker[fields[property][0]][fields[property][1]].call()
            }
            results.push(currentRow);
        }
        
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(results);

        response.header('Content-disposition', 'attachment; filename=data.csv');
        response.header('Content-Type', 'text/csv');
        response.status(200).send(csv);
    }
}

module.exports = FakerController
