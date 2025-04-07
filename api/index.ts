import Fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;

const fastify = Fastify({});

type requestQuery = {
  payload: string;
};

fastify.get<{ Querystring: requestQuery }>('/api', (request, response) => {
  const { payload } = request.query;

  const payloadNumber = Number(payload);

  if (Number.isNaN(payloadNumber)) {
    response.code(400).send('Payload is not a number.');

    return;
  }

  response.code(200).type('text/plain').send(Math.ceil(Math.random() * payloadNumber).toString());
});

fastify.listen({ port: Number(PORT) || 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
