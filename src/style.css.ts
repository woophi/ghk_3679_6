import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const slider = style({
  borderRadius: '1rem !important',
  marginTop: '1rem',
});

const slid = style({
  width: 'calc(100% - var(--slider-input-progress-margin-horizontal) * 2) !important',
});

const swSlide = recipe({
  base: {
    minWidth: '58px',
    maxWidth: 'max-content',
    height: '32px',
    backgroundColor: '#F8F8F8',
    padding: '4px 12px',
    borderRadius: '1rem',
    fontSize: '14px',
    lineHeight: '24px',
    textAlign: 'center',
    color: '#6F6F6F',
    transition: 'all .25s ease',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: '#000',
        color: '#FFF',
      },
    },
  },
});

export const appSt = {
  bottomBtn,
  container,
  slider,
  slid,
  swSlide,
};
