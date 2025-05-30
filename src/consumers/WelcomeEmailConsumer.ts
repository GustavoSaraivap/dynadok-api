import 'dotenv/config';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'welcome-consumer',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',')
});
const consumer = kafka.consumer({ groupId: 'welcome-mail' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'cliente.cadastrado', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const { nome, email } = JSON.parse(message.value.toString());

      // Simulação de envio de e-mail
      console.log(`Enviando boas-vindas para ${email} (${nome})`);
    }
  });

  console.log('WelcomeEmailConsumer está aguardando mensagens…');
};

run().catch(console.error);
