const END_POINT = 'https://economia.awesomeapi.com.br/json/all';

const fecthAPI = async () => {
  const requisicao = fetch(END_POINT);
  const response = await requisicao;
  const data = await response.json();
  // console.log(data);
  return data;
};

export default fecthAPI;
