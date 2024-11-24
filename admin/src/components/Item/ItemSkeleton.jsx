import Skeleton from "react-loading-skeleton";
import './Item.css'


const ItemSkeleton = ({ items }) => {
  return Array(items)
    .fill(0)
    .map((_, i) => (
      <div className="itemSkeleton item" key={i}>
        <div className="rowImg">
          <Skeleton height={200} style={{ borderRadius: "15px 15px 0 0", paddingTop: '2px', marginBottom: '1.3rem' }}/>
        </div>
        <div className="rowContent">
          <div className="skeletonTitle">
          <Skeleton style={{ height: '25px'}} />  <Skeleton style={{  height: '25px'}} />
          </div>
          <Skeleton count={3} style={{ marginBottom: ".3rem", height: '10px' }} />
          <Skeleton  style={{ height: '30px', width: '30%', margin: '1.3rem 0'}} />
        </div>
      </div>
    ));
};
export default ItemSkeleton;
