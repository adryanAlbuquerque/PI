import axios from 'axios';


//const API_URL = `${process.env.REACT_APP_API_URL}/usuarios`;
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

export const getProfessores = () => {
  return axios.get(API_URL);
};


export const createProfessor = (aluno) => {
  return axios.post(API_URL, aluno);
};


export const updateProfessor = (id, aluno) => {
  return axios.put(`${API_URL}/${id}`, aluno);
};


export const deleteProfessor = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Função para obter todas as disciplinas
export const getDisciplina = () => {
  return axios.get(API_URL);
};

// Função para criar uma nova disciplina
export const createDisciplina = (disciplina) => {
  return axios.post(API_URL, disciplina);
};

// Função para atualizar uma disciplina existente
export const updateDisciplina = (id, disciplina) => {
  return axios.put(`${API_URL}/${id}`, disciplina);
};

// Função para deletar uma disciplina
export const deleteDisciplina = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};