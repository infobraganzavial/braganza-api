# braganza_api - api

## Project setup
```
npm install

docker compose up

npm install --save-dev sequelize-cli
npm run migrate:up
```

### Ejecutar scripts en base de datos

```sql
INSERT INTO `Businesses` 
(`id`,
`name`,
`address`,
`logo`,
`aboutUs`,
`status`,
`createdAt`,
`updatedAt`)
VALUES (
1,
'Branganza Vial',
'Uruguay', 
'logo',
'BRAGANZA VIAL SAS ES UNA EMPRESA ESPECIALIZADA EN LA REALIZACIÓN DE OBRAS DE INFRAESTRUCTURA, FUNDADA POR EDUARDO JOAO, CON MÁS DE 15 AÑOS DE EXPERIENCIA EN EL RUBRO.
ESTÁ COMPUESTA POR UN JOVEN EQUIPO QUE CUENTA CON AMPLIA EXPERIENCIA, Y DISPONE DE UN EXTENSO PARQUE DE MAQUINARIA QUE PERMITAN LA REALIZACIÓN DE LOS TRABAJOS DE UNA MANERA SEGURA Y EFICIENTE.
CADA PROYECTO PARA NOSOTROS REPRESENTA UN RETO QUE ESTAMOS DISPUESTOS A AFRONTAR CON DEDICACIÓN, SIEMPRE MOSTRANDO NUESTRO COMPROMISO EN CUMPLIR CON LAS EXPECTATIVAS DE NUESTROS CLIENTES. NOS ENFOCAMOS EN BRINDAR LAS MEJORES SOLUCIONES CONSTRUCTIVAS EN BASE A LAS NECESIDADES PARTICULARES, CARACTERIZÁNDONOS POR NUESTRA FLEXIBILIDAD ANTE CUALQUIER TRABAJO, APOSTANDO SIEMPRE AL ÉXITO DEL PROYECTO, EN CUANTO A TIEMPOS DE CONSTRUCCIÓN Y CALIDAD.',
'a',
'2023-03-16 16:15:39',
'2023-03-16 16:15:39'
);

INSERT INTO `Roles` VALUES (1,'Superadmin','a','2022-09-19 17:48:23','2022-09-19 17:48:23'),(2,'Admin','a','2022-09-19 17:48:28','2022-09-19 17:48:28'),(3,'Customer','a','2023-03-16 16:15:39','2023-03-16 16:15:39');

```

### Hacer nueva migracion

```
npx sequelize-cli migration:create --name modify_users_add_new_fields
```

Modificar archivo con fields
```js
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'avatar', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Users',
        'token',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Users',
        'confirmEmail',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'Users',
        'tokenEmail',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'avatar'),
      queryInterface.removeColumn('Users', 'token'),
      queryInterface.removeColumn('Users', 'confirmEmail'),
      queryInterface.removeColumn('Users', 'tokenEmail'),
    ]);
  }
};
```

Actualizar modelo con nuevos fields

```
npm run migrate:up
```

### Compiles and hot-reloads for development
```
npm run start or nodemon
```