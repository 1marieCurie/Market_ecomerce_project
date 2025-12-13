// create this class somewhere in your project
package org.projet.exception;



public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
