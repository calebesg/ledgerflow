package calebesg.com.github.backend.infrastructure.exception;

public class TransactionNotFoundException extends RuntimeException{
    public TransactionNotFoundException(String message){
        super(message);
    }

    public TransactionNotFoundException(){
        super("Transaction not found");
    }
}
