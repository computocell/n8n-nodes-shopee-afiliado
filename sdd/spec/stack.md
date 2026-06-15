# Stack — n8n-node-shopee-afiliado

## Dependências

| Camada | Escolha | Versão | Motivo |
|--------|---------|--------|--------|
| Core | n8n-workflow | ^2.16.0 | SDK principal do n8n |
| Core | n8n-core | ^2.16.1 | Funcionalidades core do n8n |
| Build | typescript | ^5.8.3 | Superset JS para tipagem |
| Build | gulp | ^5.0.1 | Automação de tarefas de build |
| Test | jest | ^29.0.0 | Runner de testes |
| Security | javascript-obfuscator | ^5.4.2 | Proteção de código |

## Layout do projeto
```
.
├── credentials             # Definição de credenciais n8n
├── nodes                   # Implementação dos nodes
│   └── ShopeeAffiliate     # Node principal
│       ├── actions         # Operações individuais (ShortLink, GetOffers, etc)
│       ├── descriptions    # Definições de propriedades da UI
│       ├── helpers         # Utilitários e handlers de erro
│       └── transport       # Camada de comunicação (GraphQL)
├── scripts                 # Scripts auxiliares (ex: ofuscação)
└── sdd                     # Documentação de Design do Software (SDD)
```
