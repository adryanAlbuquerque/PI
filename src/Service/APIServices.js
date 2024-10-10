import axios from 'axios';

// URLs das APIs
const API_URL = 'http://localhost:8080/usuarios';
const API_URL_DISCIPLINA = 'http://localhost:8080/disciplinas';
const API_URL_TURMAS = 'http://localhost:8080/turmas'; 
const API_URL_CONCEITOS = 'http://localhost:8080/conceitos'; // URL para a rota de conceitos
const API_URL_COMUNICADOS = 'http://localhost:8080/comunicados'

// Funções para gerenciar alunos
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

// Funções para gerenciar professores
export const getProfessores = () => {
  return axios.get(API_URL);
};

export const createProfessor = (professor) => {
  return axios.post(API_URL, professor);
};

export const updateProfessor = (id, professor) => {
  return axios.put(`${API_URL}/${id}`, professor);
};

export const deleteProfessor = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Função para obter todas as disciplinas
export const getDisciplina = () => {
  return axios.get(API_URL_DISCIPLINA);
};

export const createDisciplina = (disciplina) => {
  return axios.post(API_URL_DISCIPLINA, disciplina);
};

export const updateDisciplina = (id, disciplina) => {
  return axios.put(`${API_URL_DISCIPLINA}/${id}`, disciplina);
};

export const deleteDisciplina = (id) => {
  return axios.delete(`${API_URL_DISCIPLINA}/${id}`);
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

// Funções para gerenciar turmas
export const getTurmas = () => {
  return axios.get(API_URL_TURMAS);
};

export const createTurma = (turma) => {
  return axios.post(API_URL_TURMAS, turma);
};

export const updateTurma = (id, turma) => {
  return axios.put(`${API_URL_TURMAS}/${id}`, turma);
};

export const deleteTurma = (id) => {
  return axios.delete(`${API_URL_TURMAS}/${id}`);
};

// Funções para gerenciar conceitos
export const getConceitos = () => {
  return axios.get(API_URL_CONCEITOS);
};

export const createConceito = (conceito) => {
  return axios.post(API_URL_CONCEITOS, conceito);
};

export const updateConceito = (id, conceito) => {
  return axios.put(`${API_URL_CONCEITOS}/${id}`, conceito);
};

export const deleteConceito = (id) => {
  return axios.delete(`${API_URL_CONCEITOS}/${id}`);
};

// Funções para gerenciar comunicados
export const getComunicados = () => {
  return axios.get(API_URL_COMUNICADOS);
};

export const createComunicado = (comunicado) => {
  return axios.post(API_URL_COMUNICADOS, comunicado);
};

export const updateComunicado = (id, comunicado) => {
  return axios.put(`${API_URL_COMUNICADOS}/${id}`, comunicado);
};

export const deleteComunicado = (id) => {
  return axios.delete(`${API_URL_COMUNICADOS}/${id}`);
};