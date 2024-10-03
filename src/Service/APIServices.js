import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Função para obter todos os alunos
export const getAlunos = () => {
  return axios.get(API_URL);
};

// Função para criar um novo aluno
export const createAluno = (aluno) => {
  return axios.post(API_URL, aluno);
};

// Função para editar um aluno existente
export const updateAluno = (id, aluno) => {
  return axios.put(`${API_URL}/${id}`, aluno);
};

// Função para deletar um aluno
export const deleteAluno = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
