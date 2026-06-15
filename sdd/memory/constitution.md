# Constituição — n8n-node-shopee-afiliado

## Missão
Prover uma integração robusta e performática entre o n8n e a API de Afiliados da Shopee, facilitando a automação de marketing de afiliados e busca de produtos.

## Stack
| Camada | Escolha | Motivo |
|--------|---------|--------|
| Runtime | Node.js / TypeScript | Padrão do ecossistema n8n |
| Framework | n8n SDK | Base para criação de nodes customizados |
| Build | tsc + gulp | Transpilação e gestão de assets (ícones) |
| Testes | Jest | Framework de teste padrão para Node.js |
| DevOps | Docker | Facilita o desenvolvimento e teste local com n8n |

## Decisões resolvidas
| Decisão | Resolução |
|---------|-----------|
| Ofuscação | Uso de `javascript-obfuscator` para proteção do código fonte |
| Transporte | Uso de GraphQL para comunicação com a API Shopee |

## Regras (máx. 10)
1. Sem commits diretos em main
2. Branch por feature
3. Seguir rigorosamente a estrutura de nodes do n8n
4. Todo novo arquivo TypeScript deve seguir as configurações do `tsconfig.json`
5. Testes unitários obrigatórios para novas operações em `__tests__/`
6. Secrets (AppID, Secret, etc) nunca devem ser commitados; usar credentials do n8n
7. Build deve passar obrigatoriamente antes do deploy
8. Utilizar a camada `transport/graphql.request.ts` para chamadas de API
9. Manter `GenericFunctions.ts` apenas para lógicas compartilhadas puras
10. Ofuscar o código apenas na etapa final de build/pre-publish
