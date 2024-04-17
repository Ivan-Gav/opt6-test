import { reactive } from "vue";

export default function useSettingsMenu() {

const contMenuParams = reactive({
  show: false,
  x: 0,
  y: 0,
});

const handleOutsideClick = () => {
  contMenuParams.show = false
}

const handleSettingsClick = (e) => {
  contMenuParams.x = e.pageX;
  contMenuParams.y = e.pageY;
  contMenuParams.show = !contMenuParams.show;
};


return { contMenuParams,  handleOutsideClick, handleSettingsClick}
}

