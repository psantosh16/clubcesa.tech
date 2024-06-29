import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { convertTagsBtoF } from '@/lib/convert-tags';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import DeleteAlertBtn from './delete-alert-btn';

export default function ResourceCard({
  id,
  title,
  description,
  link,
  tags,
  author,
  verified,
}: {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  author: { name: string; avatar: string; github: string };
  verified: boolean;
}) {
  const tagsLabel = convertTagsBtoF(tags).sort((a, b) => a.localeCompare(b));

  return (
    <Card className='group relative'>
      <CardHeader className='pb-2'>
        <Link
          href={link}
          target='_blank'
          className='group-hover:underline group-hover:underline-offset-4'
        >
          <CardTitle className='p-0 text-lg'>{title}</CardTitle>
        </Link>
      </CardHeader>

      <CardContent className='pb-3'>
        <p className='line-clamp-3 text-sm'>{description}</p>
      </CardContent>

      <CardFooter className='flex flex-col items-start gap-4'>
        <p className='line-clamp-1'>
          <span className='font-semibold'>{'Tags: '}</span>
          {tagsLabel.join(', ')}
        </p>

        <Link
          href={author.github}
          target='_blank'
          className='flex flex-row items-center gap-2 group-hover:underline group-hover:underline-offset-4'
        >
          <Avatar className='size-6'>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className='font-bold text-cesa-blue'>
              {author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <span className='text-xs font-normal'>{author.name}</span>
        </Link>
      </CardFooter>

      <div className='absolute bottom-3 right-3 space-x-2 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100'>
        <Button size='icon' variant='outline' asChild>
          <Link href={`/dashboard/resources/edit/${id}`}>
            <Pencil size={18} />
          </Link>
        </Button>
        <DeleteAlertBtn id={id} />
      </div>

      <span
        className={cn(
          'absolute right-4 top-4 size-2 rounded-full',
          verified ? 'bg-green-600' : 'bg-red-600',
        )}
      ></span>
    </Card>
  );
}
