# <a href="https://platform.sizmek.com"><img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/HTML5_logo.png" alt="Sizmek" width="26" height="36" /></a> VideoBackground Viewability <a href="https://platform.sizmek.com"><img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/logo-dark.png" alt="Sizmek" width="57" height="15" /></a>

Plantilla genérica con todo lo necesario para crear formatos tipo VideoBackground utilizando workspaces de Sizmek.

## WARNING

<img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/warning.png" alt="Sizmek" width="20" height="20" />

#### Esta plantilla utiliza un sistema que mide la visibilidad del formato mediante un panel flotante que se situa en el lateral del skin o en su defecto, sobre el billboard de la pieza. Este sistema no sigue el standard de visibilidad de la IAB. La utilización de esta plantilla implica que entiendes y aceptas este sistema de medición.

## Descripción

El formato VideoBackground es sencillo de configurar y tiene diferentes posibilidades para cubrir los requisitos de todos los soportes certificados. La plantilla permite crear el formato con video o con una imagen estática.

La base del formato depende de cada soporte y plan de medios; hay soportes en los que la base es un 1x1, otros que requieren de una base de billboard o que incluso aceptan diferentes tipos de tamaños de base dependiendo de la acción. Si no te han especificado cual debe ser la base del formato, contacta con tu agencia de medios.

La plantilla consta de dos ficheros html, uno para la base del formato y otro para el skin con video.


## Configuración 

Para editar las opciones del formato, modifica los valores del fichero *setup.js* que se encuentra en el directorio "panels/kinVideo" de la plantilla.

```javascript
var setup = {
	isStatic:false,
	autoPlayVideo:true,
	autoPlayFrequency:1,
	autoExpand:false,
	autoExpandFrequency:1,
	topGap: 150,
	collapseOnVideoEnds: true,
	unmuteOnExpand: true,
	muteOnCollapse:true,
	restartVideoOnExpand:false,
	pauseOnCollapse: false
};
```
Es posible hacer que el formato se expanda realizando la llamada desde la base. Simplemente habria que realizar la siguiente llamada para que se recoja la expansion desde el panel del skin de video.

```javascript

EB._sendMessage("baseExpansionRequest", {});

```

Cuando tengas terminada la creatividad, sube la pieza a la plataforma. En este caso, el formato que debes seleccionar en la plataforma es **HTML5 EXPANDABLE BANNER**. ¿No tienes claro cómo? Puedes seguir esta pequeña guia [Subir Creatividades Sizmek](http://www.sizmek.es/wiki/subir-creatividades-html5/).

Este formato necesita un script en la configuración de la plataforma, pídele al equipo de Sizmek que te lo configure.

Recuerda que si tienes cualquier duda puedes ponerte en contacto con el equipo de <a href="mailto:creativesupport-spain@sizmek.com">Soporte Creativo de Sizmek</a>

***