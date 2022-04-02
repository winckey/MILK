import { Suspense } from "react";

import Model from "./Model";

const Goods = ({}) => {
  return (
    <Suspense fallback={null}>
      <Model path="/gucci_shoes.gltf" />
    </Suspense>
  );
};

export default Goods;
