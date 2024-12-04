import axios from 'axios';

const API_URL = 'http://localhost:8080/usuarios';
const API_URL_DISCIPLINA = 'http://localhost:8080/disciplinas';
const API_URL_TURMAS = 'http://localhost:8080/turmas'; 
const API_URL_CONCEITOS = 'http://localhost:8080/conceitos';
const API_URL_COMUNICADOS = 'http://localhost:8080/comunicados';
const API_URL_PROFESSORDISCIPLINA = 'http://localhost:8080/professor-disciplinas';
const API_URL_ALUNOTURMA = 'http://localhost:8080/aluno-turmas';

export const getAlunos = () => {
  return axios.get(API_URL);
};

export const createAluno = (aluno) => {
  console.log(aluno)
  return axios.post(`${API_URL}/criar`, aluno);
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

export const createProfessor = (professor) => {
  console.log(professor)
  return axios.post(`${API_URL}/criar`, professor);
};

export const updateProfessor = (id, professor) => {
  return axios.put(`${API_URL}/${id}`, professor);
};

export const deleteProfessor = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getProfessorDisciplinas = () => {
  return axios.get(API_URL_PROFESSORDISCIPLINA);
};

export const getProfessorDisciplinaById = (professorId, disciplinaId) => {
  return axios.get(`${API_URL_PROFESSORDISCIPLINA}/${professorId}/${disciplinaId}`);
};

export const createProfessorDisciplina = (professorDisciplina) => {
  return axios.post(API_URL_PROFESSORDISCIPLINA, professorDisciplina);
};

export const updateProfessorDisciplina = (professorId, disciplinaId, professorDisciplina) => {
  return axios.put(`${API_URL_PROFESSORDISCIPLINA}/${professorId}/${disciplinaId}`, professorDisciplina);
};

export const deleteProfessorDisciplina = (professorId, disciplinaId) => {
  return axios.delete(`${API_URL_PROFESSORDISCIPLINA}/${professorId}/${disciplinaId}`);
};

export const getCoordenadores = () => {
  return axios.get(API_URL); 
};

export const createCoordenador = (coordenador) => {
  return axios.post(`${API_URL}/criar`, coordenador);
};

export const updateCoordenador = (id, coordenador) => {
  return axios.put(`${API_URL}/${id}`, coordenador);
};

export const deleteCoordenador = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

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

export const getAllAlunoTurmas = async () => {
  try {
    const response = await axios.get(API_URL_ALUNOTURMA);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar aluno-turmas:', error);
    throw error;
  }
};

// Função para buscar um registro específico pelo alunoId e turmaId
export const getAlunoTurmaById = async (alunoId, turmaId) => {
  try {
    const response = await axios.get(`${API_URL_ALUNOTURMA}/${alunoId}/${turmaId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar aluno-turma ${alunoId}/${turmaId}:`, error);
    throw error;
  }
};

// Função para adicionar um aluno a uma turma
export const addAlunoTurma = async (alunoTurmaId) => {
  try {
    const response = await axios.post(API_URL_ALUNOTURMA, alunoTurmaId);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar aluno à turma:', error);
    throw error;
  }
};

// Função para atualizar a relação aluno-turma
export const updateAlunoTurma = async (alunoTurmaId, alunoTurmaData) => {
  try {
    const response = await axios.put(`${API_URL_ALUNOTURMA}/${alunoTurmaId}`, alunoTurmaData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar aluno-turma ${alunoTurmaId}:`, error);
    throw error;
  }
};

// Função para deletar a relação aluno-turma
export const deleteAlunoTurma = async (alunoTurmaId) => {
  try {
    await axios.delete(`${API_URL_ALUNOTURMA}/${alunoTurmaId}`);
  } catch (error) {
    console.error(`Erro ao deletar aluno-turma ${alunoTurmaId}:`, error);
    throw error;
  }
};