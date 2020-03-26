# <p align="center"> <img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/warning.png" alt="Sizmek" width="30" height="30" /> WARNING <img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/warning.png" alt="Sizmek" width="30" height="30" /></p>

### <p align="center">Esta plantilla utiliza un sistema que permite medir la visibilidad del formato mediante un panel flotante que se sitúa en el lateral del skin, o en su defecto, sobre el billboard de la pieza para resoluciones en las que el lateral no sea visible.</p>
### <p align="center">Este sistema no sigue el standard de visibilidad de la IAB. La utilización de esta plantilla implica que entiendes y aceptas este sistema de medición.</p>

# <a href="https://platform.sizmek.com"><img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/HTML5_logo.png" alt="Sizmek" width="26" height="36" /></a> VideoBackground Viewability <a href="https://platform.sizmek.com"><img src="https://github.com/MarvinMDZ/Readme_Resources/raw/master/Images/logo-dark.png" alt="Sizmek" width="57" height="15" /></a>

Plantilla genérica con todo lo necesario para crear formatos tipo VideoBackground utilizando workspaces de Sizmek.

## Descripción

Este formato lanza un panel con video que se sitúa por detrás del contenido del soporte. Cuando el usuario interactúa con la pieza, el contenido del soporte se empuja hacia abajo y se muestra el video en ventana completa. Existen diferentes tipos de configuraciones posibles para este formato y dependiendo de cada soporte, se pueden activar o desactivar según se necesite sin necesidad de añadir programación a la creatividad.

La plantilla admite cualquier tipo de contenido html y javascript que sea necesario, hay que entender esta plantilla como una base mínima para trabajar el formato y que se podrá modificar para que encaje con las necesidades creativas de la campaña.



## Ficheros de la plantilla

La plantilla consta de diferentes htmls para cada una de las partes que la componen; a parte de estos ficheros html, también encontraremos ficheros CSS con los estilos predefinidos y ficheros JAVASCRIPT donde se gestionan la mayoría de las funcionalidades de la plantilla.

A continuación, describimos el contenido de los ficheros principales del formato:

#### index.html

Este fichero contiene la base del formato. Dependiendo del soporte, la base puede ser de diferentes tamaños. En los casos en los que se trate de un 1x1 como base, no seria necesario realizar ningún cambio en este fichero. Para otros tamaños, habría que cambiar el diseño y su CSS para que encaje con el tamaño que nos hayan pedido en el plan de medios.

Es posible hacer que el formato se expanda realizando la llamada desde este fichero (por defecto la acción que se realizará al hacer click sobre el es redirigir). Simplemente habría que realizar la siguiente llamada para que se recoja la expansión desde el panel del skin de video.

```javascript

EB._sendMessage("baseExpansionRequest", {});

```
------

***

#### panels/skinVideo/index.html

Este fichero es el que contiene el video que se muestra por detrás del contenido del soporte y el botón de expansión que se sitúa en el hueco superior en los soportes que lo permiten. Por defecto, el video se mostrará ocupando todo el espacio posible sin deformarse lo que puede producir en determinadas resoluciones que se corten zonas en los laterales. Este comportamiento se puede modificar (aunque no es recomendable) desde el fichero CSS.

En el caso de la imagen estática que aparece cuando el video se ha reproducido o cuando el usuario ya ha visto la creatividad, la configuración esta hecha de forma que la imagen aparece en tamaño real alineada con la parte superior de la pagina y centrada en horizontal. Se puede utilizar como ayuda el PSD que encontrarás en la carpeta helpers que se adjunta con la plantilla.

***

#### panels/skinVideo/setup.js

En este fichero podremos modificar las diferentes opciones que tiene el formato por defecto. Es importante consultar con el soporte si se acepta modificar alguna de estas opciones ya que cada soporte puede aplicar unas especificaciones diferentes al formato y rechazar una determinada funcionalidad (por ejemplo, la auto expansión).

Para modificar estos valores simplemente habría que cambiar el valor de la variable que corresponda dentro del fichero.

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

***

#### panels/visibilityPanel/horizontalVisibilityPanel.html

Este panel se emplea para medir la visibilidad en los casos en los que la resolución del navegador sea tan pequeña que no quede espacio para ver los laterales cuando el formato no esta expandido. No es necesario aplicar ninguna modificación sobre este fichero.

***

#### panels/visibilityPanel/verticalVisibilityPanel.html

Este panel se emplea para medir la visibilidad en los casos en los que la resolución del navegador permita ver los laterales cuando el formato no esta expandido. No es necesario aplicar ninguna modificación sobre este fichero.

***

## Configuración en plataforma

Configurar el formato en la <a href="https://platform.sizmek.com">PLATAFORMA DE SIZMEK</a> es muy sencillo, simplemente tendrás que crear un zip con los ficheros de la creatividad, subir el zip a la plataforma y añadirlo a una creatividad; de forma automática se generará la configuración necesaria del formato y solamente tendremos que desmarcar en el apartado de paneles la opcion "Show Single Panel at a Time if Ad Contains Multiple Panels".

La configuración necesaria para que funcione el formato sería la siguiente:

**Ad Format:** HTML5 Expandable Format

**MAIN ASSETS**
  * **Default Image:** Seleccionar la imagen de backup incluida en el zip de la creatividad. 
  * **Workspace Folder:** Fichero zip de la creatividad subido a la plataforma.

**PANELS**

Dentro del apartado de paneles tendremos que añadir los tres paneles de la creatividad con la siguiente configuracion:

1. **Skin Video**
    * **Panel Name:** SkinVideo
    * **Asset:** Seleccionamos el fichero html correspondiente al skinVideo de la creatividad.
    * **X:** 0
    * **Y:** 0
    * **Width:** 0
    * **Height:** 0
    * **Position Type:** Page Relative(%) 
    * **Retractions:** Never

2. **Horizontal Visibility Panel**
    * **Panel Name:** horizontalVisibilityPanel
    * **Asset:** Seleccionamos el fichero html correspondiente al horizontalVisibilityPanel de la plantilla.
    * **X:** 0
    * **Y:** 150
    * **Width:** 980
    * **Height:** 100
    * **Position Type:** Banner Relative
    * **Retractions:** Never

3. **Vertical Visibility Panel**
    * **Panel Name:** verticalVisibilityPanel
    * **Asset:** Seleccionamos el fichero html correspondiente al verticalVisibilityPanel de la plantilla.
    * **X:** 980
    * **Y:** 0
    * **Width:** 100
    * **Height:** 300
    * **Position Type:** Banner Relative
    * **Retractions:** Never

En la misma seccion de panels tendremos que desmarcar la opción: "Show Single Panel at a Time if Ad Contains Multiple Panels"

Una vez configurado el formato, es necesario que se añada un custom script por parte del equipo de sizmek para que se ajuste correctamente. Envía un correo al equipo <a href="mailto:creativesupport-spain@sizmek.com">Soporte Creativo de Sizmek</a> con el id de la creatividad y ellos te lo configurarán en tu cuenta.

## FAQS

**¿Qué tamaño debe tener la base del formato?** Este formato puede partir de cualquier base, para estar seguros del tamaño que se debe implementar lo mejor es consultar a la agencia de medios para que confirme como debe ser el formato. Los tamaños mas habituales son 1x1, 980x250, 990x250 y 980x90

**¿La creatividad debe dejar el hueco para la zona superior del site?** Cada soporte marca las directrices del formato, en este caso también es necesario consultar a la agencia de medios si el soporte admite ese hueco en la zona superior o si la creatividad debe expandirse desde el billboard.

***

Recuerda que si tienes cualquier duda puedes ponerte en contacto con el equipo de <a href="mailto:creativesupport-spain@sizmek.com">Soporte Creativo de Sizmek</a>

***

