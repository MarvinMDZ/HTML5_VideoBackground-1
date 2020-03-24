# <p align="center"> <img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/warning.png" alt="Sizmek" width="30" height="30" /> WARNING <img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/warning.png" alt="Sizmek" width="30" height="30" /></p>

### <p align="center">Esta plantilla utiliza un sistema que permite medir la visibilidad del formato mediante un panel flotante que se situa en el lateral del skin, o en su defecto, sobre el billboard de la pieza para resoluciones en las que el lateral no sea visible. Este sistema no sigue el standard de visibilidad de la IAB. La utilización de esta plantilla implica que entiendes y aceptas este sistema de medición.</p>

# <a href="https://platform.sizmek.com"><img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/HTML5_logo.png" alt="Sizmek" width="26" height="36" /></a> VideoBackground Viewability <a href="https://platform.sizmek.com"><img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/logo-dark.png" alt="Sizmek" width="57" height="15" /></a>

Plantilla genérica con todo lo necesario para crear formatos tipo VideoBackground utilizando workspaces de Sizmek.

## Descripción



## Ficheros de la plantilla

#### index.html

Es posible hacer que el formato se expanda realizando la llamada desde la base. Simplemente habria que realizar la siguiente llamada para que se recoja la expansion desde el panel del skin de video.

```javascript

EB._sendMessage("baseExpansionRequest", {});

```

#### panels/skinVideo/index.html

#### panels/skinVideo/setup.js

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

#### panels/visibilityPanel/horizontalVisibilityPanel.html

#### panels/visibilityPanel/verticalVisibilityPanel.html

## Configuración en plataforma




Cuando tengas terminada la creatividad, sube la pieza a la plataforma. En este caso, el formato que debes seleccionar en la plataforma es **HTML5 EXPANDABLE BANNER**. ¿No tienes claro cómo? Puedes seguir esta pequeña guia [Subir Creatividades Sizmek](http://www.sizmek.es/wiki/subir-creatividades-html5/).

Este formato necesita un script en la configuración de la plataforma, pídele al equipo de Sizmek que te lo configure.

Recuerda que si tienes cualquier duda puedes ponerte en contacto con el equipo de <a href="mailto:creativesupport-spain@sizmek.com">Soporte Creativo de Sizmek</a>

***