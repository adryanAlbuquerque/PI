import axios from 'axios';

//const API_URL = `${process.env.REACT_APP_API_URL}/usuarios`;
const API_URL = 'http://localhost:8080/usuarios';

// Função genérica para criar qualquer tipo de usuário
export const createUsuario = (usuario) => {
  return axios.post(API_URL, usuario);
};

// Funções para os alunos
export const getAlunos = () => {
  return axios.get(`${API_URL}/alunos`);
};

export const updateAluno = (id, aluno) => {
  return axios.put(`${API_URL}/alunos/${id}`, aluno);
};

export const deleteAluno = (id) => {
  return axios.delete(`${API_URL}/alunos/${id}`);
};

// Funções para os professores
export const getProfessores = () => {
  return axios.get(`${API_URL}/professores`);
};

export const updateProfessor = (id, professor) => {
  return axios.put(`${API_URL}/professores/${id}`, professor);
};

export const deleteProfessor = (id) => {
  return axios.delete(`${API_URL}/professores/${id}`);
};

// Funções para as disciplinas
export const getDisciplinas = () => {
  return axios.get(`${API_URL}/disciplinas`);
};

export const createDisciplina = (disciplina) => {
  return axios.post(`${API_URL}/disciplinas`, disciplina);
};

export const updateDisciplina = (id, disciplina) => {
  return axios.put(`${API_URL}/disciplinas/${id}`, disciplina);
};

export const deleteDisciplina = (id) => {
  return axios.delete(`${API_URL}/disciplinas/${id}`);
};
