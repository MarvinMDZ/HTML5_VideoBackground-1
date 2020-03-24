# <p align="center"> <img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/warning.png" alt="Sizmek" width="30" height="30" /> WARNING <img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/warning.png" alt="Sizmek" width="30" height="30" /></p>

### <p align="center">Esta plantilla utiliza un sistema que permite medir la visibilidad del formato mediante un panel flotante que se situa en el lateral del skin, o en su defecto, sobre el billboard de la pieza para resoluciones en las que el lateral no sea visible.</p>
### <p align="center">Este sistema no sigue el standard de visibilidad de la IAB. La utilización de esta plantilla implica que entiendes y aceptas este sistema de medición.</p>

# <a href="https://platform.sizmek.com"><img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/HTML5_logo.png" alt="Sizmek" width="26" height="36" /></a> VideoBackground Viewability <a href="https://platform.sizmek.com"><img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/logo-dark.png" alt="Sizmek" width="57" height="15" /></a>

Plantilla genérica con todo lo necesario para crear formatos tipo VideoBackground utilizando workspaces de Sizmek.

## Descripción

Este formato lanza un panel con video que se situa por detras del contenido del soporte. Cuando el usuario interactua con la pieza, el contenido del soporte se empuja hacia abajo y se muestra el video en ventana completa. Existen diferentes tipos de configuraciones posibles para este formato y dependiendo de cada soporte, se pueden activar o desactivar segun se necesite sin necesidad de añadir programacion a la creatividad.

La plantilla admite cualquier tipo de contenido html y javascript que sea necesario, hay que entender esta plantilla como una base minima para trabajar el formato y que se podrá modificar para que encaje con las necesidades creativas de la campaña.

## Ficheros de la plantilla

La plantilla consta de diferentes htmls para cada una de las partes que la componen; a parte de estos ficheros html, tambien encontraremos ficheros CSS con los estilos predefinidos y ficheros JAVASCRIPT donde se gestionan la mayoria de las funcionalidades de la plantilla.

A continuacion describimos el contenido de los ficheros principales del formato:

#### index.html

Este fichero contiene la base del formato. Dependiendo del soporte, la base puede ser de diferentes tamaños. En los casos en los que se trate de un 1x1 como base, no seria necesario realizar ningun cambio en este fichero. Para otros tamaños, habria que cambiar el diseño y su CSS para que encaje con el tamaño que nos hayan pedido en el plan de medios.

Es posible hacer que el formato se expanda realizando la llamada desde este fichero( por defecto la accion que se realizará al hacer click sobre el es redirigir ). Simplemente habria que realizar la siguiente llamada para que se recoja la expansion desde el panel del skin de video.

```javascript

EB._sendMessage("baseExpansionRequest", {});

```

#### panels/skinVideo/index.html

Este fichero es que el contiene el video que se muestra por detras del contenido del soporte y el boton de expansion que se situa en el hueco superior en los soportes que lo permiten. Por defecto, el video se mostrara ocupando todo el espacio posible sin deformarse lo que puede producir en determinadas resoluciones que se corten zonas en los laterales. Este comportamiento se puede modificar( aunque no es recomendable ) desde el fichero CSS.

En el caso de la imagen estatica que aparece cuando el video se ha reproducido o cuando el usuario ya ha visto la creatividad, la configuracion esta hecha de forma que la imagen aparece en tamaño real alineada con la parte superior de la pagina y centrada en horizontal. Se puede utilizar como ayuda el PSD que encontrarás en la carpeta helpers que se adjunta con la plantilla.

#### panels/skinVideo/setup.js

En este fichero podremos modificar las diferentes opciones que tiene el formato por defecto. Es importante consultar con el soporte si se acepta modificar alguna de estas opciones ya que cada soporte puede aplicar unas especificaciones diferentes al formato y rechazar una determinada funcionalidad( por ejemplo, la autoexpansion ).

Para modificar estos valores simplemente habria que cambiar el valor de la variable que corresponda dentro del fichero.

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

Este panel se emplea para medir la visibilidad en los casos en los que la resolucion del navegador sea tan pequeña que no quede espacio para ver los laterales cuando el formato no esta expandido. No es necesario aplicar ninguna modificacion sobre este fichero.

#### panels/visibilityPanel/verticalVisibilityPanel.html

Este panel se emplea para medir la visibilidad en los casos en los que la resolucion del navegador permita ver los laterales cuando el formato no esta expandido. No es necesario aplicar ninguna modificacion sobre este fichero.

## Configuración en plataforma

## FAQS













Cuando tengas terminada la creatividad, sube la pieza a la plataforma. En este caso, el formato que debes seleccionar en la plataforma es **HTML5 EXPANDABLE BANNER**. ¿No tienes claro cómo? Puedes seguir esta pequeña guia [Subir Creatividades Sizmek](http://www.sizmek.es/wiki/subir-creatividades-html5/).

Este formato necesita un script en la configuración de la plataforma, pídele al equipo de Sizmek que te lo configure.

Recuerda que si tienes cualquier duda puedes ponerte en contacto con el equipo de <a href="mailto:creativesupport-spain@sizmek.com">Soporte Creativo de Sizmek</a>

***