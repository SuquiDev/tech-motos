// stores/newsStore.js

// IMPORTS
import {BACK_BASE_URL} from "/src/constants";
import { defineStore } from 'pinia';

// LÓGICA
export const useNewsStore = defineStore({
    id: 'news',
    state: () => ({
        news: [],
        myNew: null,
        loading: false,
        error: null
    }),
    getters: {

    },
    actions: {
        async fetchNewsInfo(id) {
            this.myNew = null;
            this.loading = true;
            try {
                const response = await fetch(`${BACK_BASE_URL}/wp-json/wp/v2/novedad/${id}`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información de la novedad.');
                }
                this.myNew = await response.json();
                this.news.push(this.myNew);
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
    }
})