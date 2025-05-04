import { api } from './api'

export async function apiGet<T>(endpoint: string, params?: unknown): Promise<T> {
    const response = await api.get<T>(endpoint, { params })
    return response.data
}

export async function apiPost<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await api.post<T>(endpoint, data)
    return response.data
}