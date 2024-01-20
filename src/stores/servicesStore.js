// stores/servicesStore.js

// IMPORTS
import {BACK_BASE_URL} from "/src/constants";
import { defineStore } from 'pinia';

// LÓGICA
export const useServicesStore = defineStore({
    id: 'services',
    state: () => ({
        services: [],
        service: null,
        loading: false,
        error: null
    }),
    getters: {

    },
    actions: {
        // Si quisiéramos obtener todos los servicios
        async fetchServices() {
            this.services = []
            this.loading = true
            try {
                this.services = await fetch(`${BACK_BASE_URL}/wp-json/wp/v2/servicio`)
                    .then((response) => response.json())
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async fetchServiceInfo(id) {
            this.service = null;
            this.loading = true;
            try {
                const response = await fetch(`${BACK_BASE_URL}/wp-json/wp/v2/servicio/${id}`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información del servicio.');
                }
                this.service = await response.json();
                // Agregamos la URL al servicio actual
                this.service.url = this.service.link;
                this.service.image = this.service.featured_media;
                this.services.push(this.service);
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
    }
})