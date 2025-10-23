'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Props = {
  method: 'pix' | 'boleto' | 'card' | null;
  total: number;
};

type Status = 'initial' | 'in process' | 'paid' | 'failed' | 'expired';

export function OrderStatus({ method, total }: Props) {
  const [status, setStatus] = useState<Status>('initial');
  const statusTranslations: { [key in Status]: string } = {
    initial: 'Aguardando processamento',
    'in process': 'Processando pagamento',
    paid: 'Pago com sucesso',
    failed: 'Pagamento falhou',
    expired: 'Pagamento expirado',
  };
  const navigation = useRouter();

  useEffect(() => {
    if (status === 'initial') {
      setTimeout(() => setStatus('in process'), 1000);
    } else if (status === 'in process') {
      setTimeout(() => {
        const outcomes: Status[] = ['paid', 'failed', 'expired'];
        const randomStatus =
          outcomes[Math.floor(Math.random() * outcomes.length)];
        setStatus(randomStatus);
        if (randomStatus === 'paid') {
          setTimeout(() => navigation.push('/'), 3000);
        }
      }, 2000);
    }
  }, [status]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-semibold">Status do Pedido</h2>
      <Badge
        className={`${
          status === 'paid'
            ? 'bg-green-100 text-green-800'
            : status === 'failed'
            ? 'bg-red-100 text-red-800'
            : status === 'expired'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {statusTranslations[status].toUpperCase()}
      </Badge>
      <p>Total: R$ {total.toFixed(2)}</p>
      {status !== 'paid' && status !== 'in process' && (
        <Button
          className="bg-blue-600 text-white"
          onClick={() => setStatus('initial')}
        >
          Tentar Novamente
        </Button>
      )}
    </div>
  );
}
