// JavaScript Document

var url= "../../php/sigesp_srh_a_documentos.php";
var metodo='get';
var params = 'operacion';
var img="<img src=\"../../../public/imagenes/progress.gif\"> ";


function ue_cancelar()
{
     ue_nuevo();
    scrollTo(0,0);
    
}

function ue_nuevo_codigo()
{
  function onNuevo(respuesta)
  {
	if ($('txtnrodoc').value=="") {
	
	$('txtnrodoc').value  = trim(respuesta.responseText);
	$('txtcodper').focus();
	}
  }	

  params = "operacion=ue_nuevo_codigo";
  new Ajax.Request(url,{method:'get',parameters:params,onComplete:onNuevo});
}


function ue_guardar()
{
  lb_valido=true;
  var la_objetos=new Array ("txtnrodoc","txtdendoc", "txtcodtipdoc", "cmbaccdoc");
  
 
 var la_mensajes=new Array ("el numero de registro de documento", "la denominacion del documento",   "el tipo de documento", "el acceso al documentos");
  
  lb_valido = valida_datos_llenos(la_objetos,la_mensajes);
  if(lb_valido)
  {
	  divResultado = document.getElementById('mostrar');
      divResultado.innerHTML= img;
	  function onGuardar(respuesta)
	  {
	   alert(respuesta.responseText); 
	   ue_cancelar();
	   
	  }
	
	
	
	  var documento = 
	  {
		  
	    "nrodoc"    : $F('txtnrodoc'),
		"dendoc"    : $F('txtdendoc'),
		"codtipdoc" : $F('txtcodtipdoc'),
		"accdoc"   	: $F('cmbaccdoc'),
		"dirdoc"    : $F('txtdirdoc'),
		"archdoc" 	: $('txtarchdoc').value
		};
	
	
	  var objeto = JSON.stringify(documento);
	  params = "operacion=ue_guardar&objeto="+objeto+"&insmod="+$F('hidguardar');
	  new Ajax.Request(url,{method:'post',parameters:params,onComplete:onGuardar});
  };
}


function ue_eliminar()
{
  lb_valido=true;
  var la_objetos=new Array ("txtnrodoc");
  var la_mensajes=new Array ("el n�mero de Documento. Seleccione un Documento Legal del Catalago");
  lb_valido = valida_datos_llenos(la_objetos,la_mensajes);
  if(lb_valido)
  {
	if (confirm("� Esta seguro de Eliminar este Registro ?"))
	{
	  divResultado = document.getElementById('mostrar');
      divResultado.innerHTML= img;
	  function onEliminar(respuesta)
	  {
		ue_cancelar();
		alert(respuesta.responseText);
	  }
	  
	  params = "operacion=ue_eliminar&nrodoc="+$F('txtnrodoc');
	  new Ajax.Request(url,{method:metodo,parameters:params,onComplete:onEliminar});
	}
	else
	{
	  ue_cancelar();
	  alert("Eliminaci�n Cancelada !!!");	  
	}
  }
}



function ue_nuevo()
{
  $('hidguardar').value = "";
  $('txtnrodoc').value="";
  $('txtdendoc').value="";
  $('txtcodtipdoc').value="";
  $('txtdentipdoc').value="";
  $('cmbaccdoc').value="null";
  $('txtdirdoc').value="";
  $('txtarchdoc').value="";
  $('txtnomarch').value="";
  $('txtnrodoc').readOnly=true;
  divResultado = document.getElementById('mostrar');
  divResultado.innerHTML= '';
   ue_nuevo_codigo();
}


function catalogo_tipodocumento()
{
   
   pagina="../catalogos/sigesp_srh_cat_tipodocumento.php?valor_cat=0";
  
  window.open(pagina,"catalogo","menubar=no,toolbar=no,scrollbars=yes,width=520,height=400,resizable=yes,location=no,dependent=yes");
  
 
}


	
 

function cambiar_nombre ()
 {
   $('txtnomarch').value = 	 $('txtarchdoc').value; 
 }





function ue_buscar()
{
	f=document.form1;
	li_leer=f.leer.value;
	if(li_leer==1)
	{
		window.open("../catalogos/sigesp_srh_cat_documentos.php?valor_cat=1","catalogo","menubar=no,toolbar=no,scrollbars=yes,width=518,height=400,left=50,top=50,location=no,resizable=yes");
	}
	else
	{
		alert("No tiene permiso para realizar esta operacion");
	}
}







function ue_cerrar()
{
	window.location.href="sigespwindow_blank.php";
}





//FUNCIONES PARA EL CALENDARIO

// Esta es la funcion que detecta cuando el usuario hace click en el calendario, necesaria
function selected(cal, date) {
  cal.sel.value = date; // just update the date in the input field.
                           
  if (cal.dateClicked )
      cal.callCloseHandler();
}


function closeHandler(cal) {
  cal.hide();                        // hide the calendar

  _dynarch_popupCalendar = null;
}


function showCalendar(id, format, showsTime, showsOtherMonths) {
  var el = document.getElementById(id);
  if (_dynarch_popupCalendar != null) {
    // we already have some calendar created
    _dynarch_popupCalendar.hide();                 // so we hide it first.
  } else {
    // first-time call, create the calendar.

    var cal = new Calendar(1, null, selected, closeHandler);
    if (typeof showsTime == "string") {
      cal.showsTime = true;
      cal.time24 = (showsTime == "24");
    }
    if (showsOtherMonths) {
      cal.showsOtherMonths = true;
    }
    _dynarch_popupCalendar = cal;                  // remember it in the global var
    cal.setRange(1900, 2070);        // min/max year allowed.
    cal.create();
  }
  _dynarch_popupCalendar.setDateFormat(format);    // set the specified date format
  _dynarch_popupCalendar.parseDate(el.value);      // try to parse the text in field
  _dynarch_popupCalendar.sel = el;                 // inform it what input field we use
 _dynarch_popupCalendar.showAtElement(el, "T");        // show the calendar

  return false;
}
