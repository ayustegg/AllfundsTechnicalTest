# Aplicación web de Gestión de Noticias | Prueba Técnica AllFunds Victor Ayuste

## Descripción de la prueba técnica

Crear una aplicación de gestión de noticias siguiendo la arquitectura mean stack.
La aplicación debe permitir ver, crear, archivar y eliminar noticias en varias vistas de manera que las noticias estén listadas en vertical.

El frontend esta desarrollado con Vite + React con Typescript y usando componentes de Shadcn junto a Tailwind CSS para los estilos.

El backend esta implementado con Nodejs, Express y MongoBD (con Mongoose como ORM) siguiendo las convenciones de API REST para exponer los endpoints que usaremos en el Frontend para solicitar los datos de las noticias.

## Arquitectura del Proyecto

### Estructura del Proyecto

```
AllfundsTechnicalTest/
├── backend/                 # API REST con Nodejs + Express
├── frontend/               # Aplicación React con Typescript
├── docker-compose.yml
└── README.md
```

## Tecnologías Utilizadas

### Backend

- **Node.js** -> Typescript
- **Express.js** -> API REST
- **MongoDB** -> Mongoose como ORM
- **Swagger** -> Documentación la API
- **CORS** -> Nos permite la comunicación entre el frontend y el backend

### Frontend

- **React 19 + Vite** -> Typescript
- **Vitest** -> Testing
- **Tailwind CSS**
- **ShadCN** -> para los componentes reutilizables
- **React Hook Form** -> Zod para validacion

## Base de Datos

### Esquema noticias (MongoDB)

```typescript
interface NewsItem {
  _id: string; //Id interno de Mongo
  title: string; //Titulo
  description: string; //Descripcion
  date: string; // Fecha de creación
  content: string; //Contenido de la noticia
  author: string; // Autor de la noticia
  archiveDate: string; // Fecha de archivación de la noticia, si esta a null la noticia esta como activa.
}
```

## Características del Frontend Implementadas

### 1. Ruta de Noticias Activas (`/news`)

- **Listado vertical de noticias ordenadas por fecha de creación**
- **Paginación con 3 noticias por página (configurable desde el componente para añadir más)**
- **Botón de archivar noticia**
- **Botón para crear una noticia nueva que te lleva a la ruta /news/create**
- **Al añadir se actualiza la vista para ver las noticias nuevas y al archivar se actualiza la pagina que estás actualmente gracias a la paginación.**
- **Salta un alert si la noticia ha sido archivada o no dando feedback al usuario**

### 2. Ruta de Noticias Archivadas (`/archived`)

- **Listado vertical de noticias ordenadas por fecha de archivación de la noticia**
- **Paginación con 3 noticias por página (configurable desde el componente para añadir más)**
- **Botón de eliminar noticia**
- **Al eliminar una noticia se actualiza la vista para ver las noticias archivadas sin la que acabas de eliminar y se elimina de la base de datos.**
- **Salta un alert si la noticia ha sido eliminada correctamente o no dando feedback al usuario**

### 3. Ruta para crear de Noticias (`/news/create`)

- **Formulario completo con validacion con Zod y cada input debe tener un min de caracteres**
- **Al crear la noticia salta un Alert para validar que se ha creado y hace una redirección a la ruta /news para ver las noticias activas**

### 3. Ruta Home (`/`)

- **No se utiliza, aun que más abajo en el documento explicaré que podemos añadir como mejoras en esta ruta**

## API REST (Backend)

### Endpoints

| Metodo   | Endpoint                | Descripcion                                          |
| -------- | ----------------------- | ---------------------------------------------------- |
| `GET`    | `/api/news`             | Obtener noticias activas con paginación              |
| `GET`    | `/api/news/archive`     | Obtener noticias archivadas con paginacion           |
| `POST`   | `/api/news`             | Crear nueva noticia                                  |
| `PUT`    | `/api/news/:id/archive` | Archivar noticia                                     |
| `DELETE` | `/api/news/:id`         | Eliminar noticia permanentemente de la base de datos |
| `POST`   | `/api/news/seed`        | Poblar base de datos con datos de ejemplo            |

### Caracteristicas de la API

- **Paginación en todos los endpoints de listado**
- **Validación de datos de entrada**
- **Documentación Swagger de los endpoints**
- **Cors para permitir la comunicacion con el frontend**

## Interfaz de Usuario (Frontend)

### Componentes

#### 1. **NewsCard**

- **Componente reutilizable para mostrar noticias hecho a partir de un componente de Shadcn pero adaptado a nuestra solución**
- **Soporte para acciones de archivar/eliminar y permitir le reutilización en diferentes vistas**
- **Tests unitarios**

#### 2. **PaginationComponent**

- **Permite la paginación de las noticias**
- **Tests unitarios**

#### 3. **NewsAlerts**

- **Sistema de alerts cuando se crea, archiva o elimina una noticia**
- **Tests unitarios**

## Testing

### Cobertura de Tests Frontend

Se han realizado con Vitest algunos test unitarios para los componentes que he refactorizado para reutilizarlos.

- **NewsCard**
- **PaginationComponent**
- **NewsAlerts**

### Cobertura de Tests Backend

Se han realizado con jest, en esta parte se ha testeado con test unitarios el Controlador de Noticias. Faltaría testear los endpoint para ver que respondan correctamente.

- **News Controller**

## Dockerización

### Configuración

```yaml
services:
  mongo: # Base de datos MongoDB
  backend: # API Nodejs
  frontend: # React
```

### Características

- **Poder ejecutar el frontend y el backend desde el mismo docker**
- **Volumen persistente de la base de datos**
- **Nginx configurado en el Frontend para poder servir la web**

## Instrucciones para ejecutar el proyecto

### Opción 1: "Producción"

Si no vas a realizar cambios en el codigo esta es la forma que lo tienes todo en un mismo contenedor y lo ejecutas con un solo comando.

```bash
git clone <repository-url>
cd AllfundsTechnicalTest

docker-compose up --build

# Frontend: http://localhost:3000
# Backend http://localhost:4000
# Swagger Backend: http://localhost:4000/swagger
```

### Opción 2: "Dev"

Esta opción es la más comoda si vas a realizar cambios en local y los quieres ver reflejados, el backend tienes que ir lanzando npm start para ir actualizando ya que no se ha añadido una manera para ver los cambios en caliente.

```bash
# Backend en una terminal
docker compose up -d
cd backend
npm install
npm start

# Frontend en otra terminal
cd frontend
npm install
npm run dev
```

## Requisitos de la prueba técnica

| Requisito                          | Estado |
| ---------------------------------- | ------ |
| Frontend con React                 | OK     |
| Tailwind para los estilos          | OK     |
| Vista "/news" con listado vertical | OK     |
| Botón para archivar noticias       | OK     |
| Vista "/archived" con listado      | OK     |
| Botón para eliminar noticias       | OK     |
| Comunicacion con MongoDB           | OK     |
| Backend Nodejs con Express         | OK     |
| Documentos con campos requeridos   | OK     |
| Actualización automática           | OK     |

## Mejoras que se han realidado respecto la prueba técnica

1. **Se ha añadido paginación para mejorar el rendimiento si hubiese muchas noticias.**
2. **Se ha añadido un alert cuando se crea, archiva o elimina una noticia**

## Mejoras que se podrían realizar

1. **En la vista "/" de la web se podría haber añadido un Dashboard con las noticias activas, las noticias archivadas para tener un control de cuantas hay de cada tipo**
2. **Actualizaciones en tiempo real: Implementar websockets para actualizaciones en tiempo real por si se añadiese información desde otro frontend.**
3. **Filtros: Añadir funcionalidad de búsqueda por campos de la noticia**
4. **Añadir más test a los componentes e incluso test 2E2**
5. **Mejorar la lógica del fetcheo de los datos en un hook o un servicio**
6. **En las vistas news y archived usan codigo muy similiar, se podría hacer como el NewsCard que según una propiedad cambie el comportamiento y no tener tanto codigo duplicado**
7. **Mejorar la UI/IX para el usuario final**
