using Microsoft.EntityFrameworkCore;

namespace cc_api.DAL
{
    public abstract class GenericRepository <TEntity> where TEntity : class
    {
        internal CozyCocktailsContext context;
        internal DbSet<TEntity> dbSet;

        public GenericRepository(CozyCocktailsContext context)
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
        }

        public IEnumerable<TEntity> GetAll()
        {
            return dbSet.ToList();
        }

        public virtual TEntity GetByPrimaryKey(object pKey)
        {
            return dbSet.Find(pKey)!;
        }

        public virtual void Insert(TEntity entity)
        {
            dbSet.Add(entity);
        }

        public virtual void Delete(object pKey)
        {
            TEntity entity = dbSet.Find(pKey)!;
            Delete(entity);
        }

        public virtual void Delete(TEntity entity)
        {
            if(context.Entry(entity).State == EntityState.Detached)
            {
                dbSet.Attach(entity);
            }
            dbSet.Remove(entity);
        }

        public virtual void Update(TEntity entity)
        {
            dbSet.Attach(entity);
            context.Entry(entity).State = EntityState.Modified;
        }
    }
}
