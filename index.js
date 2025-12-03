import fs from 'fs';
import { encoding_for_model } from "tiktoken";
async function contarTokens() {
    // seleccionar el modelo a utilizar
    //gpt-4, gpt 3.5 turbo,etc
    const encoding = encoding_for_model('gpt-4');

    //texto a utilizar
    const textoCompleto = fs.readFileSync('One_Hundred_Years_Of_Solitude.txt', 'utf-8');

    //dividir en chunks de 300 caracteres
    const chunks = textoCompleto.match(/(.|[\r\n]){1,3000}/g);
    let totaltokens = 0;

    //codificar texto a tokens
    chunks.forEach((chunk, i)=>{
        const tokens = encoding.encode(chunk);
        //imprimir cuanto fue lo generado
        console.log(`Chunk ${i + 1}: ${tokens.length} tokens`);
        totaltokens += tokens.length;
    });
    
    //calcular costos (estimado)

    const costoPorMilTokens=0.03; //USD por 1000 tokens (gpt-4 input)
    const costoFinal = (totaltokens*costoPorMilTokens)/1000;
    console.log(`Total de tokens: ${totaltokens}`);
    console.log (`Costo estimado: ${costoFinal} USD.`);
}

contarTokens();