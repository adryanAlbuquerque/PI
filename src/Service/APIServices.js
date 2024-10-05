import axios from 'axios';


///const API_URL = `${process.env.REACT_APP_API_URL}/usuarios`;
const API_URL = 'http://localhost:8080/usuarios';


export const getAlunos = () => {
  return axios.get(API_URL);
};


export const createAluno = (aluno) => {
  return axios.post(API_URL, aluno);
};


export const updateAluno = (id, aluno) => {
  return axios.put(`${API_URL}/${id}`, aluno);
};


export const deleteAluno = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
