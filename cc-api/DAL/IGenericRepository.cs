namespace cc_api.DAL
{
    public interface IGenericRepository <TEntity> where TEntity : class
    {
        public IEnumerable<TEntity> GetAll();
        public TEntity GetByPrimaryKey(object pKey);
        public void Insert(TEntity entity);
        public void Delete(object pKey);
        public void Delete(TEntity entity);
        public void Update(TEntity entity);
    }
}
