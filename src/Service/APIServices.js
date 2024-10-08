import axios from 'axios';

//const API_URL = `${process.env.REACT_APP_API_URL}/usuarios`;
const API_URL = 'http://localhost:8080/usuarios';

// Função genérica para criar qualquer tipo de usuário
export const createUsuario = (usuario) => {
  return axios.post(API_URL, usuario);
};

// Funções para lidar com alunos
export const getAlunos = () => {
  return axios.get(`${API_URL}/alunos`);
};

export const updateAluno = (id, aluno) => {
  return axios.put(`${API_URL}/alunos/${id}`, aluno);
};

export const deleteAluno = (id) => {
  return axios.delete(`${API_URL}/alunos/${id}`);
};

// Funções para lidar com professores
export const getProfessores = () => {
  return axios.get(`${API_URL}/professores`);
};

export const updateProfessor = (id, professor) => {
  return axios.put(`${API_URL}/professores/${id}`, professor);
};

export const deleteProfessor = (id) => {
  return axios.delete(`${API_URL}/professores/${id}`);
};
