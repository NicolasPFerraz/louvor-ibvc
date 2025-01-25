# Desenvolvimento de Sistema: Louvor IBVC

## Planejamento
Nome do software: Louvor IBVC
Subtítulo: Glorificando a Cristo e Edificando a Igreja
Descrição: Site com índice de letras numerado em ordem alfabética. Quando clicar no
título da música, deverá aparecer a letra completa com uma versão do youtube.

| ID   | Requisito             | Descrição                                                                                                                               |
|------|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| RF01 | Página Inicial        | A página inicial deverá uma barra de navegação contendo como título “Louvor IBVC”, e subtítulo “Glorifiacando a Cristo e edificando a Igreja”. Após a barra de navegação, deverá conter escrito “Índice de Letras”, e logo após um campo de pesquisa e então um índice das músicas organizadas em ordem alfabética, que podem ser ordenadas por filtros, organizadas em páginas. No final da página, deverá conter o rodapé com as informações direitos autorais, contato do responsável pelo site (o programador) |
| RF02 | Página da Letra da Música | O sistema deverá conter uma página para cada música, contendo: - Nome da música - Autor - Versão do YouTube - Letra |
| RF03 | Cadastro, remoção e adição de músicas | O sistema deverá permitir cadastrar, remover e editar músicas. Para adicionar uma nova música, deverá ser utilizado a API do Vagalume |

## Requisitos Não-Funcionais
| ID   | Requisito             | Descrição                                                                                                                              |
|------|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| RNF01 | Linguagem de Programação | Deverá ser utilizado, para o front-end, HTML, CSS e JS. Para o Back-end, deverá ser utilizado: - Javascript em conjunto com o Node - Frameworks:    - Express (para a construção do servidor)    - Sequelize |
| RNF02 | Banco de Dados        | O sistema deverá ter um banco de dados MySQL, para permitir armazenar as informações das músicas.                                   |
| RNF03 | Hospedagem            | O sistema deverá ser hospedado na locaweb.   |

## Datas de Início e Término                                                                               
| Atividade                   | Início      | Término     |
|-----------------------------|-------------|-------------|
| Levantamento de requisitos | 06/04/2024 | 09/04/2024 |
| Projeto                     | 10/04/2024 | -           |
| Desenvolvimento do Back-end | 06/05/2024 | -           |
| Desenvolvimento do Front-end| -           | -           |
| Testes                      | -           | -           |
| Implementação               | -           | -           |

## Custos
| Serviço          | Custos                                   |
|------------------|------------------------------------------|
| Custos do Serviço | R\$ 100,00                                 |
| Hospedagem       | R\$ 47,70 / trimestre (primeiro trimestre, depois R\$ 53,70) de hospedagem (servidor VPS Linux 512mb de ram e 20gb de armazenamento) |
| Domínio          | R\$ 26,90 / ano                           |

Prazo de entrega: 26/05/2024 (caso não haja a adição de novos recursos que não estão descritos neste documento)