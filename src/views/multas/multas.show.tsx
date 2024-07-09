import { apiUri } from '@/config/config';
import Layout from '@/Layouts/Layout';
import { Multa } from '@/types/payments';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function MultaShow() {
  const { id } = useParams();
  const { isLoading, data: payment } = useSWR<Multa>(`${apiUri}/payments/multas/${id}`);
  return (
    <Layout isLoading={isLoading}>
      {payment && (
        <Card className='mx-auto w-[380px] text-center'>
          <CardHeader>
            <CardTitle>
              {payment.Player?.name || 'Todo el equipo'} - {payment.Club?.name}
            </CardTitle>
            <CardDescription>{payment.type}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Precio: {Intl.NumberFormat().format(payment.price)} Gs</p>
            <p>Vencimiento: {new Date(payment.deadline).toLocaleDateString()}</p>
            <p>
              Status: {!payment.paid ? (new Date() > new Date(payment.deadline) ? 'Vencido' : 'Pendiente') : 'Pagado'}
            </p>
          </CardContent>
          <CardFooter>
            <p>{payment.observation}</p>
          </CardFooter>
        </Card>
      )}
    </Layout>
  );
}
