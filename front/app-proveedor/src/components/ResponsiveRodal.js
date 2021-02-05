import Rodal from 'rodal';
import useMatchMedia from '../shared/hooks/useMatchMedia';

export default function ResponsiveRodal({ children, visible, onClose }) {
  const { matches } = useMatchMedia('(max-width: 600px)');
  return (
    <Rodal
      visible={visible}
      onClose={onClose}
      closeOnEsc={true}
      className="dialogo-reshulo"
      customStyles={{
        width: matches ? '100%' : '400px',
        height: matches ? '100%' : '400px',
        color: 'black',
        backgroundcolor: 'black',
      }}
      animation={matches ? 'zoom' : 'zoom'}
    >
      {children}
    </Rodal>
  );
}
