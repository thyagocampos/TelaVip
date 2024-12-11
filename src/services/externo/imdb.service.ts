import axios, { AxiosInstance } from 'axios';
import { IFilme } from '../../models/filme.interface';

export class IMDBService {

    private readonly apiKey: string = 'c7179a62';
    private readonly apiUrl: string = 'http://www.omdbapi.com/';
    private axiosInstance: AxiosInstance;

    constructor() {
        // Inicializa a instância do Axios com a URL base
        this.axiosInstance = axios.create({
            baseURL: this.apiUrl,
        });
    }

    retornaFilme = async (nomeFilme: string, anoFilme: string) => {
        try {
            const params: Record<string, string> = {
                apikey: this.apiKey,
                t: nomeFilme,
                y: anoFilme
            };

            this.axiosInstance = axios.create({
                baseURL: this.apiUrl,
            });

            console.log("Parâmetros enviados:" + params);

            const response = await this.axiosInstance.get('', { params });

            if (response.data.Response === 'True') {
                // Mapeia os dados para o formato da interface IFilme
                const filme: IFilme = {
                    plot: response.data.Plot,
                    nome: response.data.Title,
                    url_img: response.data.Poster,
                };
                return filme;
            } else {
                throw new Error(response.data.Error || 'Filme não encontrado.');
            }

        }
        catch (error: any) {
            console.error('Erro ao buscar o filme:', error.message || error);
            throw new Error('Erro ao buscar o filme.');
        }
    }
}

export const imdbService = new IMDBService();