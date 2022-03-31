// https://cursos.alura.com.br/forum/topico-como-validar-email-e-senha-em-javascript-80469

export function validateEmail(email) {
  const emailUp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  return emailUp.test(email);
}

export function validateSenha(senha) {
  const tamanhoMinimoSenha = 6;
  if (senha.length >= tamanhoMinimoSenha) {
    // console.log(senha);
    return senha;
  }
}
