"""SQLAlchemy model for Casino (minimal placeholder)."""
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class ExampleModels(Base):
    __tablename__ = "casinos"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)

    def __repr__(self) -> str:  # pragma: no cover - trivial
        return f"<Casino id={self.id} name={self.name}>"
