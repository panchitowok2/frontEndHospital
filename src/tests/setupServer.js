import { setupServer } from 'msw/native'
 
export const server = setupServer(
    http.post('http://localhost:4000/api/buscar_IdPersona', (req, res, ctx) => {
      return res(ctx.json({ message: 'error' }));
    }),
    http.post('http://localhost:4000/api/buscar_Datos_Persona', (req, res, ctx) => {
      return res(ctx.json({ message: 'error' }));
    }))