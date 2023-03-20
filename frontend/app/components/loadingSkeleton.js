import Skeleton from '@mui/material/Skeleton';

export default function LoadingSkeleton() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section>
      {Array.from({ length: 4 }, (_, i) => (
        <Skeleton
          key={i}
          animation="wave"
          sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '1100px',
            padding: '15px 1px',
            fontSize: '4rem',
            borderRadius: '3px'
          }}
        />
      ))}
    </section>
  );
}
