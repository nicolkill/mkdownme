# MKDOWNME

## Descripcion
Es editor de Markdown hecho desde cero, con un backend que coordina y guarda todo y un frontend que da la usabilidad del editor

## Requerimientos

Para funcionar ambos nececitan tener instalada la herramienta **Make** la cual si estas en linux o mac ya la tienes instalada

### Backend
- Docker
### Frontend
- Node.js 8 (carbon)

## Como inciar

- `make back` para iniciar el backend
- `make front` para iniciar el frontend

> Deben ser iniciadas en terminales distintas, todo esta configurado para funcionar son algo mas

## Cosas que destacar

- Es responsivo
- No personalice mucho el html trasformado de la libreria de markdown por lo que en algunos casos no se vera tan bien como debe
- No hice un server-side-rendered por que no me gustan mucho, lo ideal para mi es teneros en proyectos separados pero para no crear 2 repos los puse y configure en una sola carpeta
- Algunas cosas las recicle de proyectos node personales que me han servido para crear buenos sistemas robustos, lo notaran en los distintos tipos de errores y excepciones
- No utilice Redux por que el store que se utilizara es muy pequeño, con el propio react state es suficiente