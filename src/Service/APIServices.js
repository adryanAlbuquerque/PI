import axios from 'axios';


//const API_URL = `${process.env.REACT_APP_API_URL}/usuarios`;
const API_URL = 'http://localhost:8080/usuarios';
const API_URL_disciplina = 'http://localhost:8080/disciplinas';

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
  return axios.get(API_URL_disciplina);
};

// Função para criar uma nova disciplina
export const createDisciplina = (disciplina) => {
  return axios.post(API_URL_disciplina, disciplina);
};

// Função para atualizar uma disciplina existente
export const updateDisciplina = (id, disciplina) => {
  return axios.put(`${API_URL_disciplina}/${id}`, disciplina);
};

// Função para deletar uma disciplina
export const deleteDisciplina = (id) => {
  return axios.delete(`${API_URL_disciplina}/${id}`);
};

// Funções para gerenciar coordenadores
export const getCoordenadores = () => {
  return axios.get(API_URL); // Assumindo que os coordenadores também estão na mesma rota
};

export const createCoordenador = (coordenador) => {
  return axios.post(API_URL, coordenador);
};

export const updateCoordenador = (id, coordenador) => {
  return axios.put(`${API_URL}/${id}`, coordenador);
};

export const deleteCoordenador = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};