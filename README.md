# workerthreads
Utilizando Worker Threads com NodeJs para processamento

Realizado teste de um processamento de numeros Primos sem worker_threads e com worker_threads utilizando NodeJS com TypeScript

a diferença dos testes são comparados abaixo, mostrando o poder de worker_threads do nodejs. 
![image](https://github.com/fidsouza/workerthreads/blob/main/workerthreads.png)

## Como executar ? 

instale as dependências usando o comando npm
após executar o comando :
`npx tsc ./src/index.ts`
o comando ts-node-dev não possui suporte para worker_threads, neste caso pode ser criado uma ponte para execução , porém não excluiria a opção de ter que executar todo o processo novamente após qualquer alteração, por isso, optei por, gerar o arquivo .js e com o comando node executar o arquivo .js




