npm init
npm i --save-dev typescript
npm i --save express socketio
npm i --save-dev @types/express @types/socketio
npm i jest --save-dev @types/jest
npm i --save-dev ts-node ts-jest
npm i --save cors
npm i --save-dev @types/cors
npm i --save-dev @types/uuid
npm i --save uuid
npm i --save supertest
npm i --save-dev @types/supertest

cp -r dos-frontend/dist/* dos-backend/dist/public 

NODE_ENV=production node dos-backend/dist/app.js
