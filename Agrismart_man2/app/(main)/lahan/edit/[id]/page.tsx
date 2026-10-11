import { Button } from '@/components/ui/button'
import { ArrowLeft, CirclePlus, Save } from 'lucide-react'
import FormEdit from './form'
import { getLahanById } from '@/services/edit';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditLahan({ params }: PageProps) {
  const {id} = await params;
  const lahan = await getLahanById(id);

  return (
    <div className='px-4 py-4 md:py-6'>
        <div className='text-[20px] font-bold flex items-center gap-2 mx-5'>
            <CirclePlus />
            <h1>LAHAN</h1>
        </div>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 rounded-[10px] m-5 p-4 inset-shadow-xs shadow-lg'>
            <FormEdit lahan={lahan} />
        </div>
    </div>
  )
}

