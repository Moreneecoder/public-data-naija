import fs from 'fs';

import cloudinary from '../AppDefinedFunctions/cloudinary.js';

const bankTable = './database/banks.json';

const bankFunctions = {    

    addABank(bank){

        try{
            const fileStr = bank.data;            

            cloudinary.uploader.upload(fileStr, 
            { folder: "bank_logos", 
              public_id: `${bank.name}-logo`,
              overwrite: true,
              invalidate: true,
              //width: 810, height: 456, crop: "fill"
            },
            function(error, result) {


                if(result){                    

                    delete bank.data;
                    const bankLogo = result.secure_url;


                    fs.readFile(bankTable, 'utf8', function readFileCallback(err, data){
                        if (err){
                            console.log(err);
                        } else {
                        
                        const banks = JSON.parse(data); //now it an object
                        const bankId = banks.table.length + 1;
                        const bankWithId = {... bank, id: bankId, logo: bankLogo}
                        banks.table.push(bankWithId); //add some data
                        const json = JSON.stringify(banks, null, 2); //convert it back to json
            
                        fs.writeFile(bankTable, json, 'utf8', function (err) { // write it back
                            if (err) throw err;
                            console.log("Saved!");
                          }); 
                        
                    }})
                }


                if(error){
                    console.log(error);
                }
            });        
            
        }
        catch(error){
            console.error(error);
        }
        
    },

    getAllBanks(){
        let allBanks = fs.readFileSync(bankTable, 
            {encoding:'utf8', flag:'r'}); 

        return JSON.parse(allBanks).table;
    },

    getABank(query){
        let allBanks = fs.readFileSync(bankTable, 
            {encoding:'utf8', flag:'r'}); 

        const banks = JSON.parse(allBanks);
        let bank = '';        

        if(query.id){
            bank = banks.table.find((bank) => bank.id == query.id);   
        }
        
        if(query.short){
            bank = banks.table.find((bank) => bank.short === query.short.toUpperCase());   
        }
        
        return bank;
    },

    getSelectBanks(query){        

        let allBanks = fs.readFileSync(bankTable, 
            {encoding:'utf8', flag:'r'}); 

        const banks = JSON.parse(allBanks);

        const bank = banks.table.filter((bank) => bank.type === query.type);

        return bank;
    },

    updateABank(id, request){
        console.log(id);
        const {type, name, short, ussd, website, email, phone} = request;

        fs.readFile(bankTable, 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            
            const banks = JSON.parse(data); //now it an object
            
            const bank = banks.table.find(bank => bank.id == id)

            console.log(bank);

            if(type) bank.type = type;
        
            if(name) bank.name = name;
        
            if(short) bank.short = short;

            if(ussd) bank.ussd = ussd;

            if(website) bank.website = website;

            if(email) bank.email = email;

            if(phone) bank.phone = phone;

            const json = JSON.stringify(banks, null, 2); //convert it back to json

            fs.writeFile(bankTable, json, 'utf8', function (err) { // write it back
                if (err) throw err;
                console.log("Updated!");
              }); 
            
        }})
    },

    deleteABank(id){
        let allBanks = fs.readFileSync(bankTable, 
            {encoding:'utf8', flag:'r'});

            let banks = JSON.parse(allBanks);

        const BanksAfterDelete = banks.table.filter(bank => bank.id != id);

        banks = {
            "table": BanksAfterDelete
        }

        const json = JSON.stringify(banks, null, 2); //convert it back to json

        fs.writeFile(bankTable, json, 'utf8', function (err) { // write it back
            if (err) throw err;
            console.log("Deleted!");
        });

    }

}

export default bankFunctions;