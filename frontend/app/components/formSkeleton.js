import Skeleton from '@mui/material/Skeleton';

export default function FormSkeleton() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <section>
            
        <Skeleton variant="rounded" animation="wave" sx={{height:'600px'}}/>
      
            

        </section>
    );
  }