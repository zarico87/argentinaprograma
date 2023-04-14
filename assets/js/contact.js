
var constraints = {
  nombre: {
    length: {
      minimum: 3,
    }
  },
  email: {
    email:true
  },
  emailConf: { 
    equality: {
      attribute: "email"
    }
  },
  motivo: {
    length: {
      minimum: 5
    }
  },
  mensaje: {
    length: {
      minimum: 10
    }
  }
}

const contactForm = document.getElementById('contactForm');

const limpiarErrores = (contactForm,invalidMessages) => {
  const { nombre,email,emailConf,motivo,mensaje } = contactForm;

  invalidMessages.invalidNombre.innerHTML = '';
  nombre.classList.remove('invalid-input');
  
  invalidMessages.invalidEmail.innerHTML = '';
  email.classList.remove('invalid-input');
  
  invalidMessages.invalidEmailConf.innerHTML = '';
  emailConf.classList.remove('invalid-input');
  
  invalidMessages.invalidMotivo.innerHTML = '';
  motivo.classList.remove('invalid-input');
  
  invalidMessages.invalidMensaje.innerHTML = '';
  mensaje.classList.remove('invalid-input');
}

contactForm.addEventListener('submit',(event) => {
  event.preventDefault();

  const { test,nombre,email,emailConf,motivo,mensaje } = contactForm;
  
  // validaciones
  const invalidMessages = document.getElementsByClassName('invalid-message');
  
  limpiarErrores(contactForm,invalidMessages)

  const invalidInputs = validate({
    nombre:nombre.value,
    email: email.value,
    emailConf: emailConf.value,
    motivo: motivo.value,
    mensaje: mensaje.value
  },constraints,{format:'grouped'});

  
  if (invalidInputs) {
    if(invalidInputs.nombre){
      invalidMessages.invalidNombre.innerHTML = 'Ingrese su nombre (al menos 3 caracteres)';
      nombre.classList.add('invalid-input');
    }

    if(invalidInputs.email){
      invalidMessages.invalidEmail.innerHTML = 'Ingrese su correo con un formato válido';
      email.classList.add('invalid-input');
    }

    if(invalidInputs.emailConf){
      invalidMessages.invalidEmailConf.innerHTML = 'Los correos ingresados no coinciden';
      emailConf.classList.add('invalid-input');
    }

    if(invalidInputs.motivo){
      invalidMessages.invalidMotivo.innerHTML = 'Seleccione un motivo de consulta';
      motivo.classList.add('invalid-input');
    }

    if(invalidInputs.mensaje){
      invalidMessages.invalidMensaje.innerHTML = 'Ingrese su mensaje o consulta (al menos 10 caracteres)';
      mensaje.classList.add('invalid-input');

    }
    
    return;
  }

  // validaciones

  const btnEnviar = document.getElementById('btn-enviar');
  btnEnviar.value = 'Enviando...';

  const consulta = {
    nombre: nombre.value,
    email: email.value,
    motivo: motivo.value,
    mensaje: mensaje.value
  }
  
  /**
   * setTimeout usado para simular una demora como si se tuviera que enviar un correo de verdad
   */
  setTimeout(() => {
    Swal.fire({
      title: '¡Formulario completo!',
      text: `Se va a enviar mail a ${consulta.nombre} (${consulta.email}).\nEn consola se puede ver el objeto completo`,
      icon: 'success',
      allowOutsideClick: false,
      showCloseButton: true,
      confirmButtonText: 'Cerrar'
    })

    btnEnviar.value = 'Enviar';
  }, 1000);

})

