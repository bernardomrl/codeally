async function sendEmailRequest() {
  try {
    const response: AxiosResponse = await axios.post(
      'http://localhost:8000/auth/reset-password',
      formData
    );

    if (response.status === 200) {
      setFormData({ email: '' });
      return 'E-mail enviado.';
    } else {
      setErrorMessage('Erro ao enviar e-mail, tente novamente mais tarde.');
      throw new Error(errorMessage);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 404) {
        if (
          error.response.data &&
          typeof error.response.data.error === 'string'
        ) {
          setErrorMessage(error.response.data.error); // Usar a mensagem de erro da API
        } else {
          setErrorMessage('E-mail não encontrado.'); // Mensagem de erro padrão para 404
        }
      } else if (
        error.response &&
        error.response.data &&
        typeof error.response.data.error === 'string'
      ) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Erro desconhecido');
      }
    }
    throw error;
  }
}

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const promise = new Promise((resolve, reject) => {
    sendEmailRequest()
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error.message);
      });
  });

  toast.promise(promise, {
    loading: 'Enviando...',
    success: (message) => message as string, // Use a mensagem de sucesso dinâmica aqui
    error: (error) => error as string
  });
}
